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
    with open("./src/data/flat_course_scrape.json", "w") as outfile:
        json.dump(await scrape_departments(), outfile)

async def scrape_departments():
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()
        await page.goto("https://catalogs.northwestern.edu/undergraduate/courses-az/")
        replace_url = page.url # url string to subtract from subpage url to get department id
        base_url = "https://catalogs.northwestern.edu"

        dep_locator = page.locator('#content #textcontainer ul:not(.letternav) li')
        dep_count = await dep_locator.count()
        # print("total: ", dep_count)
        
        data_dict = {} # data to return: info on all courses from all departments 
        for i in range(dep_count):
            nth_dep = dep_locator.nth(i)
            # print(await nth.inner_text(), '\n')
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

            # course_count, title_count = await scrape_courses(sub_page=sub_page)
            # print(i,": ", course_count, title_count)
            # if course_count != title_count:
            #     break
        # pprint(dep_dict)
        await browser.close()
    return data_dict

async def scrape_courses(sub_page):
    course_locator = sub_page.locator('#content #textcontainer .sc_sccoursedescs .courseblock')
    course_count = await course_locator.count()
    # title_count = await course_locator.locator('[class*="title"]').count()


    courses_dict = {}
    for i in range(course_count):
        nth_course = course_locator.nth(i)
    
        header = await nth_course.locator('[class*="title"]').inner_text() # classname includes "title" to scrape ".courseblocktitle"
        header = header.replace('\xa0', ' ')
        header = header.strip()
        # isolating the dep name and number
        header_text_list = header.split(' ', maxsplit=2) # 3 elements
        id = header_text_list[0] + ' ' + header_text_list[1]
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
        # if name.count("(") > 1:
        #     print(id, name, sub_page.url)
        # if not unit.isnumeric():
        #     print(unit, id, sub_page.url)
        course_info["name"] = name
        course_info["unit"] = unit
        course_info["description"] = description
        course_info["prereq"] = prereq
        course_info["distro"] = distro
        course_info["extra"] = extra_list
        

        courses_dict[id] = course_info
    return courses_dict
    
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