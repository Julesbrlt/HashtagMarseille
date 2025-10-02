namespace :admin do
  desc "Créer / mettre à jour l'admin sans mot de passe en clair"
  task create: :environment do
    # email depuis credentials si présent, sinon on demande
    email = Rails.application.credentials.dig(:admin, :email)
    if email.blank?
      print "Email admin: "
      email = STDIN.gets.strip
    else
      puts "Email admin (credentials): #{email}"
    end

    require "io/console"
    print "Mot de passe (saisi masqué): "
    password = STDIN.noecho(&:gets).strip
    puts

    user = User.find_or_initialize_by(email: email)
    user.password = user.password_confirmation = password
    user.admin = true
    user.save!
    puts "✅ Admin enregistré: #{email}"
  rescue => e
    warn "❌ Erreur: #{e.message}"
    exit 1
  end
end
