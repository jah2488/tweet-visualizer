(function() {
  $(document).ready(function() {
    var CanvasXSize, CanvasYSize, clearX, clearY, draw, dx, findMood, getTweet, init, processTweets, rateTweet, scale, sortTable, speed, tweet, tweet2, tweetList, wordArray, wordList, x, y;
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
    tweet = {
      words: ["this", "is", "my", "favorite", "tweet"],
      mood: "pos"
    };
    tweet2 = {
      words: ["I", "love", "to", "tweet", "my", "favorite", "tweet", "tweet"],
      mood: "neg"
    };
    tweetList = [];
    init = function() {
      var canvas, ctx;
      canvas = document.getElementById("canvas");
      ctx = canvas.getContext('2d');
      $('#search').focus();
      return setInterval(draw, speed);
    };
    draw = function() {
      var ctx, word, _i, _len, _results;
      ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, clearX, clearY);
      ctx.fillRect(5, 5, 2, 2);
      ctx.fillRect(CanvasXSize / 2, 5, 2, 2);
      _results = [];
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
        _results.push(word.x === 0 ? ctx.clearRect(0, 0, 5, clearY) : void 0);
      }
      return _results;
    };
    getTweet = function(query) {
      query = escape(query);
      return $.ajax({
        url: "http://search.twitter.com/search.json?q=" + query,
        dataType: "jsonp",
        timeout: 5000,
        success: function(data) {
          var resultList;
          console.log(data);
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
      var result, tweet, _i, _j, _len, _len2, _results;
      for (_i = 0, _len = results.length; _i < _len; _i++) {
        result = results[_i];
        tweet = {
          words: result.text.split(" "),
          mood: findMood(result.text.split(" "))
        };
        tweetList.push(tweet);
      }
      console.log(tweetList);
      _results = [];
      for (_j = 0, _len2 = tweetList.length; _j < _len2; _j++) {
        tweet = tweetList[_j];
        _results.push(rateTweet(tweet));
      }
      return _results;
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
      return $('table');
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
          return "pos";
        case neut:
          return "neut";
        case neg:
          return "neg";
        default:
          return "neut";
      }
    };
    init();
    return $('button#button').click(function(e) {
      var query;
      e.preventDefault;
      query = $("input#search").val();
      console.log("Query=" + query);
      return getTweet(query);
    });
  });
}).call(this);
