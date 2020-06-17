require './emblem'

class Kingdom
    attr_reader :name

    include EMBLEM
    ALPHABETS = Array('a'..'z')

    def initialize(name)
        @name = name
    end

    def encrypted_emblem 
        encrypter  = Hash[ALPHABETS.zip(ALPHABETS.rotate(EMBLEM::EMBLEM_MAP[@name].length))]
        EMBLEM::EMBLEM_MAP[@name].chars.map { |character| encrypter.fetch(character, " ") }.join
    end
end