![Logo](http://dsgriffin.github.io/images/logos/nocomment.png)

![](https://img.shields.io/badge/version-2.0.0-green.svg)

NoComment is a simple Chrome extension for hiding user-generated comments on the web.

# Features

On a fresh installation, NoComment does not block any comments; if you'd like to block comments on specific websites/routes only, you can add those websites/routes to your "Blocklist".

If you prefer to block comments on all sites by default, you can do that, and add websites/routes to your "Allowlist" instead.

You can even use the wildcard selector "*" to block or allow comments on specific "routes" of a website.

Examples:

```www.youtube.com/*```

```x.com/*/status/*```

```www.reddit.com/r/news/*```

The first example blocks/allows all YouTube videos, the second blocks/allows all X statuses, and the third specifically only blocks/allows comments on all Reddit posts in the r/news subreddit.

You're also able to change the way the comments are hidden; by default they are "collapsed" and remove the space taken originally like they never existed, but this can be changed to "hidden" if you'd like to keep the empty space the comments originally took.

# Chrome Web Store

http://chrome.google.com/webstore/detail/nocomment/bcaffknecaohmingfdfimlbllnebpepe

Please feel free to rate & leave constructive feedback!

# Build/Test

**Build**

* Clone repo and run `npm install`
* Build and compile the `app/` folder into a `dist/` folder via `npm run build`
* Watch for TypeScript updates with `npm run watch`

**Test**

* Go to the Chrome extensions page (either via `chrome://extensions/` or the `Chrome Settings Tab > More Tools > Extensions`)
* Make sure the `Developer Mode` checkbox is ticked
* Load the `dist/` folder as an unpacked extension

# Contributing

Check the "issues" tab. If you'd like to add any kind of improvement, I would be grateful!

# License

NoComment is licensed under the [MIT](LICENSE.txt) license.
