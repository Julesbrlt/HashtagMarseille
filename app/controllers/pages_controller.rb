class PagesController < ApplicationController
  def home
    @projects = Project.order(created_at: :desc)
  end
end
