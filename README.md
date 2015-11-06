# NoComment
A Chrome extension for hiding comment sections across the web (Social Media, News Articles, Blogs etc).

# Features
* Users can choose whether to hide all comments (except those on URLs/URL patterns specified in the whitelist) or show all by default (hiding those on URLs/URL patterns specified in the Block List).

**Default Setting**: hide all comments.  

* User can select how they want this to look visually - ```collapsed``` which removes all space usually taken up, ```hidden``` which hides all comments but keeps the space they'd usually take up, or ```image``` which simply places the NoComment logo over every comment. 

**Default Setting**: collapsed.

* An Allow List and Block List, where users can define URLs/URL patterns they want to allow or block respectively.  

**Default Setting**: null (empty lists).

# Installation

**Chrome Web Store**:

http://chrome.google.com/webstore/detail/nocomment/bcaffknecaohmingfdfimlbllnebpepe

**Github:**

* Download/Clone repo
* Go to the Chrome extensions page (either via ```chrome://extensions/``` or the ```Chrome Settings Tab > More Tools > Extensions```
* Make sure the Developer Mode checkbox is ticked
* Load it as an unpacked extension

# Quickstart

* Clone repo
* ```npm install```
* ```grunt build```

This will generate a ```/dist``` folder with all compiled sources, an increased version number etc.

# Contributing

Check the "issues" tab. If you'd like to add any kind of improvement, I would be grateful!

# License

GNU
