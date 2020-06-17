class Message

    def initialize(message)
        @message = message
    end

    def char_frequency
        @message.chars.frequency
    end

end