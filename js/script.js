(function() {
  $(document).ready(function() {
    var CanvasXSize, CanvasYSize, clearX, clearY, draw, dx, findMood, getTweet, hashArray, hashCount, init, linkArray, linkCount, mentionCount, negCount, posCount, processTweets, rateTweet, rtCount, sanitizeList, scale, sortTable, speed, tweet, tweet2, tweet3, tweetList, updateDisplay, wordArray, wordList, x, y;
    CanvasXSize = 900;
    CanvasYSize = 600;
    speed = 30;
    scale = 1.0;
    x = 800;
    y = 300;
    dx = 0.75;
    clearX = CanvasXSize;
    clearY = CanvasYSize;
    wordList = [];
    wordArray = [];
    linkArray = [];
    hashArray = [];
    hashCount = 0;
    rtCount = 0;
    mentionCount = 0;
    linkCount = 0;
    posCount = 0;
    negCount = 0;
    tweet = {
      words: ["this", "is", "my", "favorite", "tweet"],
      mood: "pos"
    };
    tweet2 = {
      words: ["I", "love", "to", "tweet", "my", "favorite", "tweet", "tweet"],
      mood: "neg"
    };
    tweet3 = {
      words: ["Why", "does", "it", "not", "stop", "bleeding"]
    };
    tweetList = [tweet, tweet2, tweet3];
    init = function() {
      var canvas, ctx;
      canvas = document.getElementById("canvas");
      ctx = canvas.getContext('2d');
      $('#search').focus();
      return setInterval(draw, speed);
    };
    draw = function() {
      var ctx, word, _i, _len;
      ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, clearX, clearY);
      ctx.fillRect(5, 5, 2, 2);
      ctx.fillRect(CanvasXSize / 2, 5, 2, 2);
      for (_i = 0, _len = wordArray.length; _i < _len; _i++) {
        word = wordArray[_i];
        y = ((word.frequency * 10) * -1) + 300;
        if (word.x > 0) {
          word.x -= 1;
        }
        if (y <= 0) {
          y = 0;
        }
        ctx.fillRect(word.x, y, 3, 3);
        if (word.mood === "pos") {
          ctx.fillStyle = "green";
        } else {
          ctx.fillStyle = "red";
        }
        if (word.x === 0) {
          ctx.clearRect(0, 0, 5, clearY);
        }
      }
      return updateDisplay();
    };
    updateDisplay = function() {
      $('span#RT-count').text(rtCount);
      $('span#hash-count').text(hashCount);
      $('span#pos-count').text(posCount);
      $('span#neg-count').text(negCount);
      $('span#link-count').text(linkCount);
      return $('span#mention-count').text(mentionCount);
    };
    getTweet = function(query) {
      query = escape(query);
      return $.ajax({
        url: "http://search.twitter.com/search.json?q=" + query,
        dataType: "jsonp",
        timeout: 5000,
        success: function(data) {
          var resultList;
          resultList = data.results;
          return processTweets(resultList);
        },
        error: function(data) {
          console.log("Error Occurred" + data);
          return console.log(data);
        }
      });
    };
    processTweets = function(results) {
      var result, tweet, tweetText, _i, _j, _len, _len2, _results;
      for (_i = 0, _len = results.length; _i < _len; _i++) {
        result = results[_i];
        tweetText = sanitizeList(result.text.split(" "));
        tweet = {
          words: tweetText,
          mood: findMood(result.text.split(" "))
        };
        tweetList.push(tweet);
      }
      _results = [];
      for (_j = 0, _len2 = tweetList.length; _j < _len2; _j++) {
        tweet = tweetList[_j];
        _results.push(rateTweet(tweet));
      }
      return _results;
    };
    sanitizeList = function(array) {
      var item, sanitizedArray, _i, _len;
      console.log(array);
      sanitizedArray = [];
      for (_i = 0, _len = array.length; _i < _len; _i++) {
        item = array[_i];
        if (item[0] === "#") {
          hashCount += 1;
          hashArray.push(item);
          sanitizedArray.push(item);
        }
        if (item[0] === "@") {
          mentionCount += 1;
          sanitizedArray.push(item.replace('@', ''));
        }
        if (item.replace(/[^a-zA-Z 0-9]+/g, '').length > 0) {
          sanitizedArray.push(item.replace(/[^a-zA-Z 0-9]+/g, ''));
        }
      }
      return console.log(sanitizedArray);
    };
    rateTweet = function(tweet) {
      var arrayPos, existWord, newWord, word, _i, _len, _ref;
      _ref = tweet.words;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        word = _ref[_i];
        if ($.inArray(word, wordList) === -1) {
          newWord = {
            name: word,
            frequency: 1,
            mood: tweet.mood,
            x: CanvasXSize
          };
          wordList.push(word);
          $('table').append('<tr><td id=' + word + '>' + word + '</td><td class="amount">1</td></tr>');
          wordArray.push(newWord);
        } else {
          arrayPos = $.inArray(word, wordList);
          existWord = wordArray[arrayPos];
          existWord.frequency = existWord.frequency + 1;
          $('td#' + word).next().text(existWord.frequency);
        }
      }
      return sortTable();
    };
    sortTable = function() {
      var row, rows, _i, _len, _results;
      rows = $('table tr:not(:first)');
      _results = [];
      for (_i = 0, _len = rows.length; _i < _len; _i++) {
        row = rows[_i];
        _results.push(console.log(rows));
      }
      return _results;
    };
    findMood = function(data) {
      var neg, neut, pos, word, _i, _len;
      pos = 0;
      neut = 0;
      neg = 0;
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        word = data[_i];
        switch (word) {
          case ":)":
          case "happy":
          case "excited":
          case "yay":
          case "good":
          case "love":
            pos++;
            break;
          case ":(":
          case "sad":
          case "upset":
          case "frustrated":
          case "bad":
          case "hate":
            neg++;
        }
      }
      switch (Math.max(pos, neut, neg)) {
        case pos:
          posCount += 1;
          return "pos";
        case neut:
          return "neut";
        case neg:
          negCount += 1;
          return "neg";
        default:
          return "neut";
      }
    };
    init();
    return $('button#button').click(function(e) {
      var query, tweet, _i, _len, _results;
      e.preventDefault;
      query = $("input#search").val();
      console.log("Query=" + query);
      _results = [];
      for (_i = 0, _len = tweetList.length; _i < _len; _i++) {
        tweet = tweetList[_i];
        _results.push(rateTweet(tweet));
      }
      return _results;
    });
  });
}).call(this);
