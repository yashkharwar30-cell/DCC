import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

start_kw = '<!-- SSC Course Details Modal -->'
end_kw = '<!-- Lead Capture Popup Modal -->'
start_idx = html.find(start_kw)
end_idx = html.find(end_kw)

if start_idx == -1 or end_idx == -1:
    print("Could not find bounds")
    exit(1)

modals = html[start_idx:end_idx]

# Backdrop
modals = modals.replace('bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md', 'bg-slate-900/40 backdrop-blur-sm')

# Sticky Header bg
modals = modals.replace('<div class="sticky top-0 bg-slate-900/95', '<div class="sticky top-0 bg-white/95 dark:bg-slate-900/95')
modals = modals.replace('bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-800', 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800')

# Modal Content container bg
modals = modals.replace('bg-slate-900 border-none text-slate-300', 'bg-transparent text-slate-600 dark:text-slate-300')

# Headings
modals = modals.replace('<h3 class="text-xl md:text-2xl font-black text-white', '<h3 class="text-xl md:text-2xl font-black text-slate-900 dark:text-white')
modals = modals.replace('<h4 class="font-bold text-xl text-white', '<h4 class="font-bold text-xl text-slate-900 dark:text-white')
modals = modals.replace('<h5 class="text-white font-bold', '<h5 class="text-slate-900 dark:text-white font-bold')

# Structural Borders
modals = modals.replace('border-slate-700', 'border-slate-200 dark:border-slate-700')

# List styles
modals = modals.replace('text-slate-300 leading-relaxed', 'text-slate-600 dark:text-slate-300 leading-relaxed')

# Cards bg
modals = modals.replace('bg-slate-800/50 backdrop-blur-sm', 'bg-slate-50 dark:bg-slate-800/50 backdrop-blur-sm')
modals = modals.replace('hover:bg-slate-800 transition-colors', 'hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors')
modals = modals.replace('hover:bg-slate-800/70', 'hover:bg-slate-100 dark:hover:bg-slate-800/70')

# Close Button
modals = modals.replace('bg-slate-800 hover:bg-red-500 rounded-full', 'bg-slate-100 dark:bg-slate-800 hover:bg-red-500 dark:hover:bg-red-500 rounded-full')
modals = modals.replace('text-slate-300 group-hover:text-white', 'text-slate-500 dark:text-slate-300 group-hover:text-white')

# Tables Headers
modals = modals.replace('<thead class="bg-slate-800 text-white">', '<thead class="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">')

# Table Body lines - NOTE: border-slate-700 was already replaced by border-slate-200 dark:border-slate-700
modals = modals.replace('divide-y divide-slate-200 dark:divide-slate-700 bg-transparent text-slate-300', 'divide-y divide-slate-200 dark:divide-slate-700 bg-transparent text-slate-600 dark:text-slate-300')

# Table Rows bg hover
modals = modals.replace('hover:bg-slate-800/40 transition-colors', 'hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors')

# First col in tables
modals = modals.replace('<td class="px-5 py-4 font-medium text-white', '<td class="px-5 py-4 font-medium text-slate-900 dark:text-white')

# Totals Gold
modals = modals.replace('text-yellow-400', 'text-yellow-600 dark:text-yellow-400')


with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html[:start_idx] + modals + html[end_idx:])
print("Modals updated to support light/dark modes!")
