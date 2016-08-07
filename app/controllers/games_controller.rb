class GamesController < ApplicationController

  def show
    @messages = Message.all
  end

end
