class InitTables < ActiveRecord::Migration[6.0]
  def change
    create_table :restaurants do |t|
      t.string :name, null: false
      t.integer :fee, null: false, default: 0
      t.integer :time_required, null: false
    end

    create_table :foods do |t|
      t.references :restaurant, null: false, foreign_key: true
      t.string :name, null: false
      t.integer :price, null: false
      t.text :description, null: false
    end

    create_table :line_foods do |t|
      t.references :restaurant, null: false, foreign_key: true
      t.references :foods, null: false, foreign_key: true
      t.references :order, foreign_key: true
      t.integer :count, null: false, default: 0
      t.boolean :active, null: false, default: false
    end

    create_table :orders do |t|
      t.integer :total_price, null: false, default: 0
    end
  end
end
