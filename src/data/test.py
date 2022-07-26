import re

s = "(0.5 1Units)"

s = re.sub('[a-zA-Z]|\(|\)|\s', '', s)

print(s)
# print(float(s))

print("1.5".isdigit())
print("1.5".isnumeric())
print("1.5".isdecimal())

nth_extra = "Interdisciplinary 1Distro - See Rules"
nth_extra = nth_extra.lower()[:nth_extra.lower().find("distro")]
print(nth_extra)