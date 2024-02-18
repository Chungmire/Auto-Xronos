# Auto-Xronos


This is a chrome extension I made to complete Xronos homework assignments. The answers are stored in a script loaded on the page, so this simply extracts them and enters them in the correct answer fields. It adds a button at the top of the page which attempts to complete the entire assignment when clicked. I tested this on around 20 assignments I had already completed at the end of the semester.


## Usage

1. Download from [Releases](https://github.com/Chungmire/Auto-Xronos/releases/download/Current/Xronos.zip).
2. Unzip. Result should be just the `xronos` folder.
3. Navigate to [extensions](chrome://extensions/).
4. Toggle on `Developer Mode` in the top right.
5. Click `Load Unpacked` in the top left
6. Find the `xronos` folder and double click it
7. Refresh any Xronos pages.


![](https://github.com/Chungmire/Auto-Xronos/blob/main/example.gif?raw=true)

---
## Limitations
> _Note: My last class that used Xronos was a few semesters ago. if you have a change, I will gladly review and accept any pull requests._
1. Some assignments seem to be crafted differently. I was only able to account for around 5 different variations in how the answers are stored. It's easy to do this; make an issue if it's not working on yours.
2. This completes the entire assignment rather than letting you do questions individually. It would be nice to be able to check individual questions as you go.
3. After it enters the answers, they appear blank in the answer fields for some reason. You can, however, go in the console and view them all.
