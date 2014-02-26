$ ->
<<<<<<< HEAD
  counter = 0

  WIN_PATTERNS = [
    [0,1,2]
    [3,4,5]
    [6,7,8]
    [0,3,6]
    [1,4,7]
    [2,5,8]
    [0,4,8]
    [2,4,6]
  ]

  isEmpty = (cell) ->
    !cell.text()

  getCellNumber = (cell) ->
    parseInt cell.data('index')

  clearBoard = ->
    $('.board-cell').text('')
    $('.board-cell').removeClass('o')
    $('.board-cell').removeClass('x')
    counter = 0

  resetGame = ->
=======
  isX = true

  clearBoard = ->
    $('.board-cell').text('')
    isX = true

  resetBoard = ->
>>>>>>> 002b71b388deecc57ab89da76df0ba824e942de8
    clearBoard()
    $('#gameboard').hide()
    $('#start-game').fadeIn(500)

<<<<<<< HEAD
  getBoard = ->
    ( $('.board-cell').map (idx, el) -> $(el).text() ).get()

  checkForWin = (cell) ->
    win = ''
    board = getBoard()
    patternsToTest = WIN_PATTERNS.filter (pattern) -> cell in pattern
    for p in patternsToTest
      win = board[p[0]] if '' != board[p[0]] == board[p[1]] == board[p[2]]
    if win != ''
      alert win + ' won!'
      resetGame()

  checkForTie = (counter) ->
    remainPatterns = WIN_PATTERNS
    voidedCounter = 0
    for p in remainPatterns
      board = getBoard()
      pattern = [board[p[0]],board[p[1]],board[p[2]]]
      if ('o' in pattern) and ('x' in pattern) then voidedCounter++
    if counter > 8 or voidedCounter == 8
      alert 'Tie game'
      resetGame()

  markCell = (cell, mark) ->
    cell.text mark
    cell.addClass mark
    counter += 1
    checkForWin( getCellNumber(cell) ) if counter > 4
    checkForTie counter

  # Handle start game clicks
=======
  checkForWin = () ->
    board = ($('.board-cell').map (idx, el) ->
      $(el).text()
    ).get()

    win = if board[0] == board[1] == board[2] != ''
      board[0]
    else if board[3] == board[4] == board[5] != ''
      board[3]
    else if board[6] == board[7] == board[8] != ''
      board[6]
    else if board[0] == board[3] == board[6] != ''
      board[0]
    else if board[1] == board[4] == board[7] != ''
      board[1]
    else if board[2] == board[5] == board[8] != ''
      board[2]
    else if board[0] == board[4] == board[8] != ''
      board[0]
    else if board[2] == board[4] == board[6] != ''
      board[2]
    else
      ''

    if win != ''
      alert win + ' won!'
      resetBoard()

>>>>>>> 002b71b388deecc57ab89da76df0ba824e942de8
  $('#start-game').on 'click', (e) ->
    clearBoard()
    $(@).hide()
    $('#gameboard').fadeIn(500)

<<<<<<< HEAD
  # Handle board cell clicks
  $('.board-cell').on 'click', (e) ->
    cell = $(@)
    mark = if counter % 2 == 0 then 'x' else 'o'
    markCell(cell, mark) if isEmpty(cell)
=======
  $('.board-cell').on 'click', (e) ->
    mark = if isX then 'x' else 'o'
    if ( $(@).text().replace /^\s+|\s+$/g, "" ) == ''
      $(@).text mark
      $(@).addClass mark
      isX = !isX
      checkForWin()




>>>>>>> 002b71b388deecc57ab89da76df0ba824e942de8
