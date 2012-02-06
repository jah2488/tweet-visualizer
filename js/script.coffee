$(document).ready ->
	CanvasXSize = 900
	CanvasYSize = 600
	speed       = 30    #lower is faster
	scale       = 1.0
	x           = 800
	y           = 300 #vertical offset
	dx          = 0.75
	clearX      = CanvasXSize
	clearY      = CanvasYSize

	wordList    = []
	wordArray   = []
	tweet       = {words: ["this", "is", "my", "favorite", "tweet"], mood:"pos"}
	tweet2      = {words: ["I", "love", "to", "tweet", "my", "favorite", "tweet","tweet"], mood:"neg"}
	tweetList   = []

	init= () ->
		canvas = document.getElementById("canvas")
		ctx    = canvas.getContext('2d')
		$('#search').focus()
		return setInterval(draw, speed)

	draw= () ->
		ctx = canvas.getContext('2d')
		ctx.clearRect(0,0,clearX,clearY)

		ctx.fillRect(5,5,2,2)
		ctx.fillRect(CanvasXSize/2,5,2,2)

		for word in wordArray
			y = (((word.frequency * 10) * -1) + 300)
			if word.x > 0
				word.x -= 1
			if y <= 0
				y = 0
			ctx.fillRect(word.x,y,3,3)
			if word.mood == "pos"
				ctx.fillStyle = "green"
			else
				ctx.fillStyle = "red"
			if word.x == 0
				ctx.clearRect(0,0,5, clearY)
			
	getTweet= (query) ->
		query = escape(query)
		$.ajax(
			url       : "http://search.twitter.com/search.json?q=" +query
			dataType  : "jsonp"
			timeout   : 5000
			success   : (data) ->
				console.log(data)
				resultList = data.results
				processTweets(resultList)
			error     : (data) ->
				console.log("Error Occurred" + data)
				console.log(data)
			)

	processTweets= (results) ->
		for result in results
			tweet = 
				words : result.text.split(" ")
				mood  : findMood(result.text.split(" "))
			tweetList.push(tweet)
		console.log(tweetList)
		for tweet in tweetList
			rateTweet(tweet)
	rateTweet= (tweet) ->
		for word in tweet.words
			# console.log("RateTweet word in tweet.words =>" + word)
			# console.log($.inArray(word.name, wordArray))
			if $.inArray(word, wordList) == -1
				# console.log("RateTweet word in word, wordlist =>" + word)
				newWord  = 
					name: word
					frequency:1
					mood: tweet.mood
					x     : CanvasXSize

				# console.log("RateTweet word into wordArray =>" + newWord)							
				# console.log("RateTweet word.name into wordArray =>" + newWord.name)					
				# console.log("RateTweet word.frequency into wordArray =>" + newWord.frequency)
				wordList.push(word)
				$('table').append('<tr><td id=' + word + '>' + word + '</td><td class="amount">1</td></tr>')
				wordArray.push(newWord)
			else
				# console.log("EXISTING WORD FOUND")
				arrayPos  = $.inArray(word,wordList)
				# console.log("Existing word array position" + arrayPos)
				existWord = wordArray[arrayPos]
				# console.log("Existing Word " + existWord)
				# console.log("Existing Word " + existWord.name)
				existWord.frequency = (existWord.frequency + 1)
				$('td#' + word).next().text(existWord.frequency)
				# console.log("Existing Word " + existWord.frequency)
		sortTable()
	sortTable= () ->
		$('table')
	findMood= (data) ->
		pos  = 0
		neut = 0
		neg  = 0
		for word in data
			switch word
				when ":)", "happy", "excited", "yay", "good", "love" then pos++
				when ":(", "sad", "upset", "frustrated", "bad", "hate" then neg++

		switch Math.max(pos,neut,neg)
			when pos  then "pos"
			when neut then "neut"
			when neg  then "neg"
			else
				"neut"


	init()
	$('button#button').click (e) ->
		e.preventDefault
		query = $("input#search").val()
		console.log("Query=" + query)
		getTweet(query)
	# console.log("Tweet" + tweet)
	# console.log("Tweet List" + tweetList)
	# console.log("WordList" + wordArray.toString())
	# console.log(wordArray)
	# console.log(wordList)
	# for i in wordArray
	# 	console.log(i.toString())