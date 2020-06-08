module Vehicles
    Vehicles_map = { 
        :BIKE => { :speed => 10, :time_to_cross_crater => 2 },
        :TUKTUK => { :speed => 12, :time_to_cross_crater => 1 },
        :CAR => { :speed => 20, :time_to_cross_crater => 3 }
    }
end

module Orbits
    Orbits_map = {
        :ORBIT1 => {:path_length => 18, :total_craters => 20},
        :ORBIT2 => {:path_length => 20, :total_craters => 10}
    }
end

module Weather
    Weather_map = {
        :SUNNY => {:creters_affecting_percentage => -0.1, :vehicles_allowed => [:BIKE, :TUKTUK, :CAR]},
        :RAINY => {:creters_affecting_percentage => 0.2, :vehicles_allowed => [:TUKTUK, :CAR]},
        :WINDY => {:creters_affecting_percentage => 0, :vehicles_allowed => [:BIKE, :CAR]}
    }
end