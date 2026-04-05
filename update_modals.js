const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The replacement logic will target specific class strings throughout the modals.
// Modals are matched roughly as starting after "<!-- SSC Course Details Modal -->"
// until "<!-- Lead Capture Popup Modal -->".
let startIdx = html.indexOf('<!-- SSC Course Details Modal -->');
let endIdx = html.indexOf('<!-- Lead Capture Popup Modal -->');

if (startIdx === -1 || endIdx === -1) {
    console.log("Could not find bounds");
    process.exit(1);
}

let modalsBlock = html.substring(startIdx, endIdx);

// Transformations:
// Backdrop
modalsBlock = modalsBlock.replace(/bg-slate-900\/90 dark:bg-slate-950\/90 backdrop-blur-md/g, 'bg-slate-900/40 backdrop-blur-sm');

// Modal Backgrounds
modalsBlock = modalsBlock.replace(/<div class="bg-white dark:bg-slate-900 w-full max-w-3xl/g, '<div class="bg-white dark:bg-slate-900 w-full max-w-3xl'); // already there

// Sticky Header bg
modalsBlock = modalsBlock.replace(/<div class="sticky top-0 bg-slate-900\/95/g, '<div class="sticky top-0 bg-white/95 dark:bg-slate-900/95');
modalsBlock = modalsBlock.replace(/bg-white\/95 dark:bg-slate-900\/95 backdrop-blur-sm border-b border-slate-800/g, 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800');

// Modal Content container bg
modalsBlock = modalsBlock.replace(/<div class="p-6 md:p-8 bg-slate-900 border-none text-slate-300 /g, '<div class="p-6 md:p-8 bg-transparent text-slate-600 dark:text-slate-300 ');

// Headings
modalsBlock = modalsBlock.replace(/<h3 class="text-xl md:text-2xl font-black text-white/g, '<h3 class="text-xl md:text-2xl font-black text-slate-900 dark:text-white');
modalsBlock = modalsBlock.replace(/<h4 class="font-bold text-xl text-white/g, '<h4 class="font-bold text-xl text-slate-900 dark:text-white');
modalsBlock = modalsBlock.replace(/<h5 class="text-white font-bold/g, '<h5 class="text-slate-900 dark:text-white font-bold');

// Structural Borders
modalsBlock = modalsBlock.replace(/border-slate-700/g, 'border-slate-200 dark:border-slate-700');

// List styles
modalsBlock = modalsBlock.replace(/text-slate-300 leading-relaxed/g, 'text-slate-600 dark:text-slate-300 leading-relaxed');

// Cards bg
modalsBlock = modalsBlock.replace(/bg-slate-800\/50 backdrop-blur-sm/g, 'bg-slate-50 dark:bg-slate-800/50 backdrop-blur-sm');
modalsBlock = modalsBlock.replace(/hover:bg-slate-800 transition-colors/g, 'hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors');
modalsBlock = modalsBlock.replace(/hover:bg-slate-800\/70/g, 'hover:bg-slate-100 dark:hover:bg-slate-800/70');

// Close Button
modalsBlock = modalsBlock.replace(/bg-slate-800 hover:bg-red-500 rounded-full/g, 'bg-slate-100 dark:bg-slate-800 hover:bg-red-500 dark:hover:bg-red-500 rounded-full');
modalsBlock = modalsBlock.replace(/text-slate-300 group-hover:text-white/g, 'text-slate-500 dark:text-slate-300 group-hover:text-white');

// Tables Headers
modalsBlock = modalsBlock.replace(/<thead class="bg-slate-800 text-white">/g, '<thead class="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">');
// Table Body lines
modalsBlock = modalsBlock.replace(/divide-y divide-slate-200 dark:divide-slate-700 bg-transparent text-slate-300/g, 'divide-y divide-slate-200 dark:divide-slate-700 bg-transparent text-slate-600 dark:text-slate-300'); // Note: divide-slate-700 -> divide-slate-200 dark:divide-slate-700 was already handled by replace border-slate-700
modalsBlock = modalsBlock.replace(/bg-transparent text-slate-300 border-b border-slate-200 dark:border-slate-700/g, 'bg-transparent text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700');

// Table Rows bg hover
modalsBlock = modalsBlock.replace(/hover:bg-slate-800\/40/g, 'hover:bg-slate-50 dark:hover:bg-slate-800/40');

// Table text
modalsBlock = modalsBlock.replace(/<td class="([^"]*)text-white ([^"]*)">/g, '<td class="$1text-slate-900 dark:text-white $2">');

// Bold gold text
modalsBlock = modalsBlock.replace(/text-yellow-400/g, 'text-yellow-600 dark:text-yellow-400');

html = html.substring(0, startIdx) + modalsBlock + html.substring(endIdx);
fs.writeFileSync('index.html', html);
console.log("Updated styles successfully!");
