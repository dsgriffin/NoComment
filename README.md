# NoComment
A Chrome extension for hiding comment sections across the web (Social Media, News Articles, Blogs etc).

# Features
* Users can choose whether to hide all comments (except those on URLs/URL patterns specified in the Allow List) or show all by default (hiding those on URLs/URL patterns specified in the Block List).

**Default Setting**: hide all comments.  

* User can select how they want this to look visually - either `collapsed` which completely removes all the space usually taken up or `visibility hidden` which keeps the space they'd usually take up.

**Default Setting**: collapsed.

* An Allow List and Block List, where users can define URLs/URL patterns they want to allow or block respectively.  

**Default Setting**: null (empty lists).

# Installation

**Chrome Web Store**:

http://chrome.google.com/webstore/detail/nocomment/bcaffknecaohmingfdfimlbllnebpepe

**Github:**

* Download/Clone repo
* Go to the Chrome extensions page (either via `chrome://extensions/` or the `Chrome Settings Tab > More Tools > Extensions`
* Make sure the Developer Mode checkbox is ticked
* Load it as an unpacked extension

# Quickstart

After cloning the repo simply `npm install`

To test use ```grunt test```

Finally, when you're done with a feature/commit, use `grunt build`

This will generate `/dist` + `/package` folders with all compiled sources, an increased version number etc. 

If you've built multiple times before pushing, please rollback the `version` in `app/manifest.json` to the same version number on this repo as it'll save me the hassle when uploading, thanks!

# Contributing

Check the "issues" tab. If you'd like to add any kind of improvement, I would be grateful!

# License

GNU
