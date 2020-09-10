# Mr.Jimaku

![Mr.Jimaku](./images/mrjimaku_icon128.png)

This is a Chrome Extension to show your caption on the YouTube.
<!-- [Mr.Jimaku][] -->
<!-- ![Badge Status](https://ci-as-a-service) -->  

## Features
***DEMO:***
![demo](./images/mrjimaku_demo.gif)
- If you have a caption file, you can watch the video with the caption
- Of course, you can also use files that were given by someone else
- You can turn on or off the display of the caption

**⚠ We're assuming UTF-8 character set for the caption file.**

Here's how to write a caption file. It's the format of the srt file.

```text
1
00:00:00,000 --> 00:00:07,560
これは字幕ファイルから読み取った字幕です。

2
00:00:10,230 --> 00:00:14,700
This is a test video
```

1. Write timestamp for start time and end time of the text to be displayed
2. Write the text one line below the timestamp

Timestamp is written like `hh:mm:ss,sss --> hh:mm:ss,sss`.
`hh` is the hour, `mm` is the minute, `ss` is second, and `sss` is millisecond.
`:` is a delimiter for `hh`, `mm` and `ss`,
and `,` is a delimiter for `hh:mm:ss` and `sss`.  
Start time, ` --> `, and end time, in that order.  

Actually, if it's written in this format,
you don't have to worry about the file extension.  

<!-- For more information, see `awesome-tool help`. -->  

<!-- ## Requirement -->
<!-- - Requirement -->  

## Usage

1. View YouTube video page in chrome
2. Select a caption file in the box under the title

You can turn off the caption by pressing the switch next to the box.

<!-- ## Installation -->
<!-- ```sh                                              -->  
<!-- $ git clone https://github.com/eetann/awesome-tool -->  
<!-- ```                                                -->  

<!-- ## Anything Else -->  

## Author
[@eetann092](https://twitter.com/eetann092)  

<!-- ## License                           -->  
<!-- [MIT](http://eetann.mit-license.org) -->  
