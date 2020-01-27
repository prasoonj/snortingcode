# About SnortingCode
I started this blog several years ago to document random thoughts, research, experiments around coding, technology, politics and other things that interest me. As technolgies changed, and the organizations I truested became evil, I've kept migrating this from one space to the other, from one tech-stack to the other. I have lost a few notes in the process (and formatting for several articles that I might sort out when I have more time on my hands).

## Since I forget
You certainly don't need to know this but, since I tend to forget these things if I return to writing after a long hiatus, here are the steps that need to be taken to publish this site which is currently buit on elmstatic.


To run/test locally:

``` sh
$ npm install -g browser-sync

$ elmstatic watch
Building the site
  Compiling layouts
Success!                                                             
  Generating pages
  Generating posts
  Generating tag pages
  Cleaning out the output path (docs/snortingcode)
  Writing HTML
  Generating feeds
  Duplicating pages
  Copying resources
Ready! Watching for changes...


$ cd docs/snortingcode #this is how I've configured config.json
$ browser-sync start --server --files "." --no-ui  --reload-delay 500 --reload-debounce 500
```


Deploy:
``` sh
$ elmstatic build
```