class DeleteImage < ActiveRecord::Migration[7.1]
  def change
    remove_column :projects, :image
  end
end
