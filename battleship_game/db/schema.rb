# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170217160218) do

  create_table "games", force: :cascade do |t|
    t.string   "player_1_positions",              null: false
    t.string   "player_2_positions"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.integer  "current_player"
    t.string   "player_1_hits",      default: ""
    t.string   "player_1_misses",    default: ""
    t.string   "player_2_hits",      default: ""
    t.string   "player_2_misses",    default: ""
    t.string   "winner"
  end

end
