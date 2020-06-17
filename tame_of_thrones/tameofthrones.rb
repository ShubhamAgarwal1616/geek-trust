class Array
    def frequency
      Hash.new(0).tap { |map| each { |character| map[character] += 1 } }
    end
end

class TameOfThrones    

    def initialize(kingdoms, messages)
        @kingdoms = kingdoms
        @messages = messages
        @allies = []
    end

    def find_allies
        @kingdoms.each_with_index do |kingdom, index|
            encrypted_emblem = kingdom.encrypted_emblem
            encrypted_emblem_frequency = encrypted_emblem.chars.frequency
            secret_message_frequency = @messages[index].char_frequency
            @allies.push(kingdom.name.upcase) if encrypted_emblem_frequency.all? { |character, count| secret_message_frequency[character] >= count }
        end
        @allies.uniq.tap { |ary| ary.delete("SPACE") }.length > 2 ? "SPACE " + @allies.join(" ") : "NONE"
    end
end