class ModifyGameFields < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :white_in_check, :boolean
    add_column :games, :black_in_check, :boolean
    add_column :games, :white_player_id, :integer
    add_column :games, :black_player_id, :integer
    add_column :games, :winning_player_id, :integer
    add_column :games, :turn, :integer, :default => 1
    add_column :games, :en_passant, :text, array:true, :default => []
    add_column :games, :castling, :text, array:true, :default => [true, true]
  end
end
