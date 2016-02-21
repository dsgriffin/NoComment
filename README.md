# NoComment ![logo](https://github.com/dsgriffin/NoComment/raw/master/app/images/favicon.png)

[![Build Status](https://travis-ci.org/dsgriffin/NoComment.svg?branch=master)](https://travis-ci.org/dsgriffin/NoComment)

A Chrome extension for hiding comment sections across the web (Social Media, News Articles, Blogs etc).

# Features
* Users can choose whether to hide all comments (except those on URLs/URL patterns specified in the Allow List) or show all by default (hiding only the URLs/URL patterns specified in the Block List).

**Default Setting**: `hide all`  

* Users can select how they want this to visually look - either collapsed (`display: none`) which completely removes the space usually taken or hidden (`visibility: hidden`) which keeps the space the comment section would usually take up.

**Default Setting**: `collapsed`

* An Allow List and Block List, where users can define URLs/URL patterns they want to allow or block respectively.  

**Default Setting**: `empty`

# Installation

**Chrome Web Store**:

http://chrome.google.com/webstore/detail/nocomment/bcaffknecaohmingfdfimlbllnebpepe

**Github/Gitlab:**

* Download/Clone repo
* Go to the Chrome extensions page (either via `chrome://extensions/` or the `Chrome Settings Tab > More Tools > Extensions`
* Make sure the Developer Mode checkbox is ticked
* Load it as an unpacked extension

# Quickstart

After cloning the repo simply run `npm install`

To test use ```grunt test```

Finally, when you're done with a feature/commit, use `grunt build`

This will generate `/dist` + `/package` folders with all compiled sources, an increased version number etc. 

If you've used `grunt build` multiple times before pushing, please rollback the `version` in `app/manifest.json` to one above the version number on this repo (e.g. if it's `1.7.6` then make sure it's `1.7.7`) as it'll save me the hassle when uploading, thanks!

# Contributing

Check the "issues" tab. If you'd like to add any kind of improvement, I would be grateful!

# License

GNU
