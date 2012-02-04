$(document).ready ->
	CanvasXSize = 900
	CanvasYSize = 600
	speed       = 15    #lower is faster
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
	tweetList   = [tweet, tweet2]

	init= () ->
		canvas = document.getElementById("canvas")
		ctx    = canvas.getContext('2d')

		return setInterval(draw, speed)

	draw= () ->
		ctx = canvas.getContext('2d')
		ctx.clearRect(0,0,clearX,clearY)

		if x > 0
				x -= 1

		for word in wordArray
			y = (((word.frequency * 10) * -1) + 300)
			ctx.fillRect(x,y,5,5)
			if word.mood == "pos"
				ctx.fillStyle = "green"
			else
				ctx.fillStyle = "red"
		
		ctx.fillRect(x,400,5,5)
	
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
				# console.log("RateTweet word into wordArray =>" + newWord)							
				# console.log("RateTweet word.name into wordArray =>" + newWord.name)					
				# console.log("RateTweet word.frequency into wordArray =>" + newWord.frequency)
				wordList.push(word)
				wordArray.push(newWord)
			else
				# console.log("EXISTING WORD FOUND")
				arrayPos  = $.inArray(word,wordList)
				# console.log("Existing word array position" + arrayPos)
				existWord = wordArray[arrayPos]
				# console.log("Existing Word " + existWord)
				# console.log("Existing Word " + existWord.name)
				existWord.frequency = (existWord.frequency + 1)
				# console.log("Existing Word " + existWord.frequency)
	init()
	rateTweet(tweet)
	rateTweet(tweet2)
	$('button#button').click ->
		rateTweet(tweet2)
	# console.log("Tweet" + tweet)
	# console.log("Tweet List" + tweetList)
	# console.log("WordList" + wordArray.toString())
	# console.log(wordArray)
	# console.log(wordList)
	# for i in wordArray
	# 	console.log(i.toString())