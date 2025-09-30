class ProjectsController < ApplicationController
  before_action :require_admin!, except: [:show]

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
      render :new
    end
  end

  def edit
    @project = Project.find(params[:id])
  end

  def update
    @project = Project.find(params[:id])
    if @project.update(params_project)
      redirect_to project_path(@project)
    else
      render :edit
    end
  end

  def destroy
    @project = Project.find(params[:id])
    @project.destroy
    redirect_to root_path, notice: "Projet supprimé."
  end

  private

  def params_project
    params.require(:project).permit(:name, :description, :image)
  end

  def require_admin!
    unless current_user&.admin?
      redirect_to root_path, alert: "Accès réservé à l’administrateur."
    end
  end
end
