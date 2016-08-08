class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    # ActionCable.server.broadcast 'game_channel', message: render_message(message)
    ActionCable.server.broadcast 'game_channel', message: "-50"
  end

  private
    def render_message(message)
      ApplicationController.renderer.render(partial: 'messages/message', locals: { message: message })
    end
end
