import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

start_kw = "<!-- SSC Course Details Modal -->"
end_kw = "<!-- Lead Capture Popup Modal -->"
start_idx = html.find(start_kw)
end_idx = html.find(end_kw)

modals = html[start_idx:end_idx]

# Fix trailing text issues in descriptions
modals = modals.replace('class="text-slate-300 text-sm leading-relaxed"', 'class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed"')

html = html[:start_idx] + modals + html[end_idx:]

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
print("done")
