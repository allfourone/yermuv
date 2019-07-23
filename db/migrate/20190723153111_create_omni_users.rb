class CreateOmniUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :omni_users do |t|
      t.string :provider
      t.string :uid
      t.string :emailfirst_name
      t.string :last_name
      t.string :picture

      t.timestamps
    end
  end
end
