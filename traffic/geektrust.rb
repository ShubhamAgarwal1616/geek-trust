require './modules.rb'

class Traffic

    def time_in_travelling(vehicle, creters_affecting_percentage, orbit_details, traffic_speed)
        vehicle_details = Vehicles::Vehicles_map[vehicle]
        max_speed_of_vehicle = traffic_speed > vehicle_details[:speed] ? vehicle_details[:speed] : traffic_speed
        no_of_craters = orbit_details[:total_craters] + creters_affecting_percentage * orbit_details[:total_craters]
        orbit_path_length = orbit_details[:path_length]
        ((orbit_path_length.to_f / max_speed_of_vehicle) * 60) + vehicle_details[:time_to_cross_crater] * no_of_craters
    end

    def find_fastest_means_to_travel(weather_details, orbits_traffic_speed)
        min_time, output = [nil, nil]
        weather_details[:vehicles_allowed].each do |vehicle|
            Orbits::Orbits_map.each_with_index do |(orbit_name, orbit_map), index|
                time_in_min = time_in_travelling(vehicle, weather_details[:creters_affecting_percentage], orbit_map, orbits_traffic_speed[index])
                if min_time.nil? || time_in_min < min_time 
                    min_time = time_in_min
                    output = vehicle.to_s + " " + orbit_name.to_s
                end 
            end
        end
        output
    end

    def determine_orbit_and_vehicle(file)
        weather, orbits_traffic_speed = File.read(file).split(" ", 2)
        orbits_traffic_speed = orbits_traffic_speed.split(" ").map!(&:to_i)
        weather_map = Weather::Weather_map[weather.to_sym]
        find_fastest_means_to_travel(weather_map, orbits_traffic_speed)
    end

end

def main 
    input = ARGV
    puts Traffic.new.determine_orbit_and_vehicle(input[0])
end

main