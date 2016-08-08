class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    # ActionCable.server.broadcast 'game_channel', message: render_message(message)
    puts '!!!!!!!!!!!!!!!!!!!'
    puts message.content.class
    if message.content.to_i > 0
      speed = -55
    else
      speed = 55
    end
    ActionCable.server.broadcast 'game_channel', message: speed
  end

  private
    def render_message(message)
      ApplicationController.renderer.render(partial: 'messages/message', locals: { message: message })
    end
end
