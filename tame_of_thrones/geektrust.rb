require './tameofthrones'
require './kingdom'
require './message'

def main
    input = ARGV
    kingdoms = []
    messages = []
    File.foreach(input[0]) do |line|
        kingdom, secret_message = line.split(" ", 2).map(&:downcase)
        kingdoms.push(Kingdom.new(kingdom))
        messages.push(Message.new(secret_message))
    end
    puts TameOfThrones.new(kingdoms, messages).find_allies
end

main
