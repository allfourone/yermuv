class AddPiecesCapturedAndGamesWon < ActiveRecord::Migration[5.2]
  def change
  	add_column :users, :win, :integer
  	add_column :users, :lose, :integer
  	
  	add_column :games, :white_piece_captured, :text, array:true, :default => []
  	add_column :games, :black_piece_captured, :text, array:true, :default => []
  	
  end
end
