class ProjectsController < ApplicationController

  def index
    @projects = Project.all
  end

  def show
    @project = Project.find(params[:id])
  end

  def new
    @project = Project.new
  end

  def create
    @project = Project.new(params_project)
    if @project.save
      redirect_to project_path(@project)
    else
      render new
    end
  end

  private

  def params_project
    params.require(:project).permit(:name, :description, :image)
  end
end
