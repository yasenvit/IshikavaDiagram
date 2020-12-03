const SplitText = (ctx, text, shiftWidth, text_height) => {
    /* wraps the text that longer than max_width into multiple lines.
  Returns text length and height  */
    var words = text.split(" ");
    var word = words[0];
    var wordLength = ctx.measureText(word).width;
    let lines = wordLength > shiftWidth * 0.9 ? splitWord(word, shiftWidth) : [word];
    for (var i = 1; i < words.length; i++) {
        word = words[i];
        var width = ctx.measureText(lines[lines.length - 1] + " " + word).width;
        if (width + text_height < shiftWidth) {
            lines[lines.length - 1] += " " + word;
        } else {
            wordLength = ctx.measureText(word).width;
            let newLine = wordLength > shiftWidth * 0.9 ? splitWord(word, shiftWidth) : [word];
            lines.push(...newLine);
        };
    };
    let longestWordLength = Math.max(...lines.map(element => ctx.measureText(element).width));
    return { text: lines, maxLength: longestWordLength <= shiftWidth * 0.9 ? longestWordLength : shiftWidth * 0.9 };
};

const splitWord = (substring, spaceLeft) => {
    for (let i = substring.length; i >= 0; i--) {
        if (substring.slice(0, i).length < spaceLeft) {
            return [`${substring.slice(0, i - 2)}-`, substring.slice(i - 2)];
        };
    };
};

export default SplitText;
