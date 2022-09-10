import asyncio
from pprint import pprint
from playwright.async_api import async_playwright
import re
import json


async def main():
    '''
    creates json file of courses from NU course catalog
    flat data structure
    '''
    # await scrape_departments()
    with open("./src/data/subject_scrape.json", "w") as outfile:
        json.dump(await scrape_departments(), outfile)

async def scrape_departments():
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()
        await page.goto("https://catalogs.northwestern.edu/undergraduate/courses-az/")
        # replace_url = page.url # url string to subtract from subpage url to get department id
        base_url = "https://catalogs.northwestern.edu"

        dep_locator = page.locator('#content #textcontainer ul:not(.letternav) li')
        dep_count = await dep_locator.count()
        # print("total: ", dep_count)
        
        data_dict = {} # data to return: info on all courses from all departments 
        for i in range(dep_count):
            nth_dep = dep_locator.nth(i)
            # print(await nth.inner_text(), '\n')
            nth_dep_name = await nth_dep.inner_text()
            url_address = await nth_dep.locator('a').get_attribute("href")
            sub_page = await context.new_page()
            await sub_page.goto(base_url + url_address)

            # pattern = "https://catalogs.northwestern.edu/undergraduate/courses-az/(.*?)/"
            # dep_id = re.search(pattern=pattern, string=sub_page.url).group(1).upper()
            # dep_id = substring found where (.*?) is within pattern string
            # in this case, the department id

            # another way to get dep_id
            # dep_id = sub_page.url.replace(replace_url, "")
            # dep_id = re.sub('\W', '', dep_id)
            # dep_id = dep_id.upper()
            
            data_dict = data_dict | await scrape_courses(sub_page=sub_page)
            # | == new way to merge dictionaries in python 3.9

            # course_count, title_count = await scrape_courses(sub_page=sub_page)
            # print(i,": ", course_count, title_count)
            # if course_count != title_count:
            #     break
            print(f"Scraped Department: {nth_dep_name}")
        # pprint(dep_dict)
        await browser.close()
    return data_dict