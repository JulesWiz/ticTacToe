// Generated by CoffeeScript 1.7.1
(function() {
  "use strict";
  var BoardCtrl,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  this.ticTacToe = angular.module('TicTacToe', []);

  ticTacToe.constant('WIN_PATTERNS', [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]);

  BoardCtrl = (function() {
    function BoardCtrl($scope, WIN_PATTERNS) {
      this.$scope = $scope;
      this.WIN_PATTERNS = WIN_PATTERNS;
      this.mark = __bind(this.mark, this);
      this.parseBoard = __bind(this.parseBoard, this);
      this.hintAtBestMoves = __bind(this.hintAtBestMoves, this);
      this.flashCells = __bind(this.flashCells, this);
      this.rowStillWinnable = __bind(this.rowStillWinnable, this);
      this.announceTie = __bind(this.announceTie, this);
      this.announceWinner = __bind(this.announceWinner, this);
      this.gameUnwinnable = __bind(this.gameUnwinnable, this);
      this.player = __bind(this.player, this);
      this.movesRemaining = __bind(this.movesRemaining, this);
      this.numberOfMoves = __bind(this.numberOfMoves, this);
      this.resetBoard = __bind(this.resetBoard, this);
      this.getRow = __bind(this.getRow, this);
      this.getPatterns = __bind(this.getPatterns, this);
      this.startGame = __bind(this.startGame, this);
      this.resetBoard();
      this.$scope.mark = this.mark;
      this.$scope.startGame = this.startGame;
      this.$scope.gameOn = false;
      this.$scope.animateIt = this.animateIt;
    }

    BoardCtrl.prototype.startGame = function() {
      this.$scope.gameOn = true;
      return this.resetBoard();
    };

    BoardCtrl.prototype.getPatterns = function() {
      return this.patternsToTest = this.WIN_PATTERNS;
    };

    BoardCtrl.prototype.getRow = function(pattern) {
      var c;
      c = this.cells;
      return ("" + (this.cells[pattern[0]] || pattern[0])) + ("" + (this.cells[pattern[1]] || pattern[1])) + ("" + (this.cells[pattern[2]] || pattern[2]));
    };

    BoardCtrl.prototype.someoneWon = function(row) {
      return 'xxx' === row || 'ooo' === row;
    };

    BoardCtrl.prototype.resetBoard = function() {
      this.$scope.theWinnerIs = false;
      this.$scope.cats = false;
      this.cells = this.$scope.cells = {};
      this.winningCells = this.$scope.winningCells = {};
      this.$scope.currentPlayer = this.player();
      return this.getPatterns();
    };

    BoardCtrl.prototype.numberOfMoves = function() {
      return Object.keys(this.cells).length;
    };

    BoardCtrl.prototype.movesRemaining = function(player) {
      var totalMoves;
      totalMoves = 9 - this.numberOfMoves();
      if (player === 'x') {
        return Math.ceil(totalMoves / 2);
      } else if (player === 'o') {
        return Math.floor(totalMoves / 2);
      } else {
        return totalMoves;
      }
    };

    BoardCtrl.prototype.player = function(options) {
      var moves;
      options || (options = {
        whoMovedLast: false
      });
      moves = this.numberOfMoves() - (options.whoMovedLast ? 1 : 0);
      if (moves % 2 === 0) {
        return 'x';
      } else {
        return 'o';
      }
    };

    BoardCtrl.prototype.isMixedRow = function(row) {
      return !!row.match(/o+\d?x+|x+\d?o+/i);
    };

    BoardCtrl.prototype.hasOneX = function(row) {
      return !!row.match(/x\d\d|\dx\d|\d\dx/i);
    };

    BoardCtrl.prototype.hasTwoXs = function(row) {
      return !!row.match(/xx\d|x\dx|\dxx/i);
    };

    BoardCtrl.prototype.hasOneO = function(row) {
      return !!row.match(/o\d\d|\do\d|\d\do/i);
    };

    BoardCtrl.prototype.hasTwoOs = function(row) {
      return !!row.match(/oo\d|o\do|\doo/i);
    };

    BoardCtrl.prototype.isEmptyRow = function(row) {
      return !!row.match(/\d\d\d/i);
    };

    BoardCtrl.prototype.gameUnwinnable = function() {
      return this.patternsToTest.length < 1;
    };

    BoardCtrl.prototype.announceWinner = function(winningPattern) {
      var k, v, winner, _ref, _ref1;
      winner = this.cells[winningPattern[0]];
      _ref = this.cells;
      for (k in _ref) {
        v = _ref[k];
        this.winningCells[k] = (_ref1 = parseInt(k), __indexOf.call(winningPattern, _ref1) >= 0) ? 'win' : 'unwin';
      }
      this.$scope.theWinnerIs = winner;
      return this.$scope.gameOn = false;
    };

    BoardCtrl.prototype.announceTie = function() {
      this.$scope.cats = true;
      return this.$scope.gameOn = false;
    };

    BoardCtrl.prototype.rowStillWinnable = function(row) {
      return !(this.isMixedRow(row) || (this.hasOneX(row) && this.movesRemaining('x') < 2) || (this.hasTwoXs(row) && this.movesRemaining('x') < 1) || (this.hasOneO(row) && this.movesRemaining('o') < 2) || (this.hasTwoOs(row) && this.movesRemaining('o') < 1) || (this.isEmptyRow(row) && this.movesRemaining() < 5));
    };

    BoardCtrl.prototype.getWinningCell = function(row, player, winningMoves) {
      var m, o, x;
      o = /oo(\d)|o(\d)o|(\d)oo/i;
      x = /xx(\d)|x(\d)x|(\d)xx/i;
      m = row.match((player === 'x' ? x : o));
      if (!!m) {
        return winningMoves.push(m[1] || m[2] || m[3]);
      }
    };

    BoardCtrl.prototype.getPossibleWins = function(row, player, possibleWins) {
      var i, m, o, _i, _len, _name, _ref, _results;
      o = /o(\d)(\d)|(\d)o(\d)|(\d)(\d)o/i;
      o = /x(\d)(\d)|(\d)x(\d)|(\d)(\d)x/i;
      m = row.match((player === 'x' ? x : o));
      if (!!m) {
        _ref = [1, 2, 3, 4, 5, 6];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          if (m[i]) {
            possibleWins[_name = m[i]] || (possibleWins[_name] = 0);
            _results.push(possibleWins[m[i]] += 1);
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };

    BoardCtrl.prototype.flashCells = function(cells) {
      var cell, color, _i, _len, _results;
      color = this.player() === 'x' ? "hsla( 208, 55.9%, 44.5%, 0.7 )" : "hsla( 120, 39.6%, 46.0%, 0.7 )";
      _results = [];
      for (_i = 0, _len = cells.length; _i < _len; _i++) {
        cell = cells[_i];
        jQuery("#cell-" + cell).css({
          backgroundColor: color
        });
        _results.push(jQuery("#cell-" + cell).animate({
          backgroundColor: "white"
        }, 2000));
      }
      return _results;
    };

    BoardCtrl.prototype.hintAtBestMoves = function() {
      var blockLoss, blockWinInTwo, forceWinInTwo, pattern, row, winOnThisMove, _i, _len, _ref;
      winOnThisMove = [];
      blockLoss = [];
      forceWinInTwo = {};
      blockWinInTwo = {};
      _ref = this.patternsToTest;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        pattern = _ref[_i];
        row = this.getRow(pattern);
        this.getWinningCell(row, this.player(), winOnThisMove);
        this.getWinningCell(row, this.player({
          whoMovedLast: true
        }), blockLoss);
        this.getPossibleWins(row, this.player(), forceWinInTwo);
        this.getPossibleWins(row, this.player({
          whoMovedLast: true
        }), blockWinInTwo);
      }
      forceWinInTwo = Object.keys(forceWinInTwo).filter(function(k) {
        return forceWinInTwo[k] > 1;
      });
      blockWinInTwo = Object.keys(blockWinInTwo).filter(function(k) {
        return blockWinInTwo[k] > 1;
      });
      return this.flashCells(winOnThisMove.length > 0 ? winOnThisMove : blockLoss > 0 ? blockLoss : forceWinInTwo.length > 0 ? forceWinInTwo : blockWinInTwo.length > 0 ? blockWinInTwo : []);
    };

    BoardCtrl.prototype.parseBoard = function() {
      var winningPattern;
      winningPattern = false;
      this.patternsToTest = this.patternsToTest.filter((function(_this) {
        return function(pattern) {
          var row;
          row = _this.getRow(pattern);
          if (_this.someoneWon(row)) {
            winningPattern || (winningPattern = pattern);
          }
          return _this.rowStillWinnable(row);
        };
      })(this));
      if (winningPattern) {
        return this.announceWinner(winningPattern);
      } else if (this.gameUnwinnable()) {
        return this.announceTie();
      } else {
        return this.hintAtBestMoves();
      }
    };

    BoardCtrl.prototype.mark = function($event) {
      var cell;
      this.$event = $event;
      cell = this.$event.target.dataset.index;
      if (this.$scope.gameOn && !this.cells[cell]) {
        this.cells[cell] = this.player();
        this.parseBoard();
        return this.$scope.currentPlayer = this.player();
      }
    };

    return BoardCtrl;

  })();

  BoardCtrl.$inject = ["$scope", "WIN_PATTERNS"];

  ticTacToe.controller("BoardCtrl", BoardCtrl);

}).call(this);

//# sourceMappingURL=application.map
