class Array
    def frequency
      Hash.new(0).tap { |map| each { |character| map[character] += 1 } }
    end
end

class TameOfThrones
    ALPHABETS = Array('a'..'z')
    module KINGDOMS
        EMBLEM_MAP = {
            "space" => "gorilla",
            "land" => "panda",
            "water" => "octopus",
            "ice" => "mammoth",
            "air" => "owl",
            "fire" => "dragon"
        }
    end

    def encrypt(string, shift)
        encrypter  = Hash[ALPHABETS.zip(ALPHABETS.rotate(shift))]
        string.chars.map { |character| encrypter.fetch(character, " ") }
    end

    def find_allies(input)
        allies = []
        File.foreach(input) do |line|
            kingdom, secret_message = line.split(" ", 2).map(&:downcase)
            encrypted_emblem = encrypt(KINGDOMS::EMBLEM_MAP[kingdom], KINGDOMS::EMBLEM_MAP[kingdom].length).join
            encrypted_emblem_frequency = encrypted_emblem.chars.frequency
            secret_message_frequency = secret_message.chars.frequency
            allies.push(kingdom.upcase) if encrypted_emblem_frequency.all? { |character, count| secret_message_frequency[character] >= count }
        end
        allies.uniq.tap { |ary| ary.delete("SPACE") }
    end
end

def main
    input = ARGV
    allies_kingdoms = TameOfThrones.new.find_allies(input[0])
    puts allies_kingdoms.length > 2 ? "SPACE " + allies_kingdoms.join(" ") : "NONE"
end

main
