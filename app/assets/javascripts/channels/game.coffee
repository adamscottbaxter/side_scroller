App.game = App.cable.subscriptions.create "GameChannel",
  connected: ->
    # Called when the subscription is ready for use on the server


  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    console.log(data['message']);
    player1.body.velocity.y = parseInt(data['message']);

  speak: (message) ->

    @perform 'speak', message: player1.body.velocity.y


