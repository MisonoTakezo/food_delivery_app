class ApplicationController < ActionController::API
  before_action :fake_load

  def fake_load
    sleep(3)
  end
end
