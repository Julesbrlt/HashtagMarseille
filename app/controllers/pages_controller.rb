class PagesController < ApplicationController
  def home
    @projects = Project.order(created_at: :asc)
  end

  def privacy
  end

  def legal
  end
end
