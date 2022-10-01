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
    data = await scrape_subjects()
    with open("./src/data/flat_course_scrape.json", "w") as outfile:
        json.dump(data['courses'], outfile)
    
    with open("./src/data/flat_subject_scrape.json", "w") as outfile:
        json.dump(data['subjects'], outfile)

async def scrape_subjects():
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()
        await page.goto("https://catalogs.northwestern.edu/undergraduate/courses-az/")
        # replace_url = page.url # url string to subtract from subpage url to get subject id
        base_url = "https://catalogs.northwestern.edu"

        dep_locator = page.locator('#content #textcontainer ul:not(.letternav) li')
        dep_count = await dep_locator.count()
        # print("total: ", dep_count)
        subject_list = [] # list of subjects (id and name)
        course_list = [] # list of info on all courses from all subject 
        for i in range(dep_count):
            nth_dep = dep_locator.nth(i)
            # print(await nth.inner_text(), '\n')
            nth_dep_name = await nth_dep.inner_text()
            url_address = await nth_dep.locator('a').get_attribute("href")
            sub_page = await context.new_page()
            await sub_page.goto(base_url + url_address)

            pattern = "https://catalogs.northwestern.edu/undergraduate/courses-az/(.*?)/"
            dep_id = re.search(pattern=pattern, string=sub_page.url).group(1).upper()
            # data_dict = data_dict | await scrape_courses(sub_page=sub_page)
            # | == new way to merge dictionaries in python 3.9
            course_list.extend(await scrape_courses(sub_page=sub_page))

            subject_name = nth_dep_name.rsplit(f'({dep_id})', maxsplit=1)[0].strip()
            subject_list.append({"id": dep_id, "name": subject_name})
            
            print(f"Scraped Subject: {nth_dep_name}")
        await browser.close()
        subject_list.sort(key=lambda x: x['id'])
        course_list.sort(key=lambda x: x['id'])
    return {"subjects": subject_list, "courses": course_list}

async def scrape_courses(sub_page):
    course_locator = sub_page.locator('#content #textcontainer .sc_sccoursedescs .courseblock')
    course_count = await course_locator.count()
    

    courses_list = []
    for i in range(course_count):
        nth_course = course_locator.nth(i)
    
        header = await nth_course.locator('[class*="title"]').inner_text() # classname includes "title" to scrape ".courseblocktitle"
        header = header.replace('\xa0', ' ')
        header = header.strip()
        # isolating the dep name and number
        header_text_list = header.split(' ', maxsplit=2) # 3 elements
        
        subject = header_text_list[0]
        number = header_text_list[1]
        id = subject + ' ' + number
        name_unit_list = header_text_list[-1].rsplit('(', maxsplit=1)
        name = name_unit_list[0].strip()
        unit = re.sub('[a-zA-Z]|\(|\)|\s', '', name_unit_list[-1])
        if "-" in unit:
            unit = [float(i) for i in unit.split("-")]
        else:
            unit = float(unit)

        description = await nth_course.locator('[class*="desc"]').inner_text() # classname includes "desc" to scrape ".courseblockdesc"
        description = description.replace('\xa0', ' ')
        description = description.strip()
        extra_locator = nth_course.locator('[class*="extra"]') # classname includes "extra" to scrape ".courseblockextra"
        prereq, distro, extra_list = await scrape_extra(extra_locator=extra_locator)
        
        course_info = {}
        course_info["id"] = id
        course_info["subject"] = subject
        course_info["number"] = number
        course_info["name"] = name
        course_info["unit"] = unit
        course_info["description"] = description
        course_info["prereq"] = prereq
        course_info["distro"] = distro
        course_info["extra"] = extra_list
        

        courses_list.append(course_info)
    return courses_list
    
async def scrape_extra(extra_locator):
    extra_count = await extra_locator.count()
    prereq = ""
    distro = []
    extra_list = []
    for i in range(extra_count):
        nth_extra = await extra_locator.nth(i).inner_text()
        nth_extra = nth_extra.replace('\xa0', ' ')
        nth_extra = nth_extra.strip(" .")
        if nth_extra.lower().startswith("prereq"):
            prereq = nth_extra.split(' ', maxsplit=1)[-1]
        elif "distro" in nth_extra.lower():
            distro.append(nth_extra.lower()[:nth_extra.lower().find("distro")].strip(" ."))
        else:
            extra_list.append(nth_extra)

    return prereq, distro, extra_list

asyncio.run(main())