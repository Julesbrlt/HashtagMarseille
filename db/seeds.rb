Project.destroy_all
User.destroy_all

User.create!(email: "christophe@baralotto.com", password: "azerty", admin: true)

projects = [
  {
    name: "Atout Voix",
    description: "L'association 'Atout voix' (ex 'Bel endroit pour une rencontre') propose une expérience originale et innovante : 'Raconte-moi un match' est un parcours original construit autour d’une série d’ateliers pédagogiques et ludiques avec 3 objectifs principaux : Education au langage, Ouverture sur les métiers dans les médias et sensibilisation à l'éthique du sport.",
    image_path: Rails.root.join("app/assets/images/atout-voix.jpg")
  },
  {
    name: "Atout Voi",
    description: "L'association 'Atout voix' (ex 'Bel endroit pour une rencontre') propose une expérience originale et innovante : 'Raconte-moi un match' est un parcours original construit autour d’une série d’ateliers pédagogiques et ludiques avec 3 objectifs principaux : Education au langage, Ouverture sur les métiers dans les médias et sensibilisation à l'éthique du sport.",
    image_path: Rails.root.join("app/assets/images/atout-voix.jpg")
  },
  {
    name: "Atout Vo",
    description: "L'association 'Atout voix' (ex 'Bel endroit pour une rencontre') propose une expérience originale et innovante : 'Raconte-moi un match' est un parcours original construit autour d’une série d’ateliers pédagogiques et ludiques avec 3 objectifs principaux : Education au langage, Ouverture sur les métiers dans les médias et sensibilisation à l'éthique du sport.",
    image_path: Rails.root.join("app/assets/images/atout-voix.jpg")
  },
  {
    name: "Atout V",
    description: "L'association 'Atout voix' (ex 'Bel endroit pour une rencontre') propose une expérience originale et innovante : 'Raconte-moi un match' est un parcours original construit autour d’une série d’ateliers pédagogiques et ludiques avec 3 objectifs principaux : Education au langage, Ouverture sur les métiers dans les médias et sensibilisation à l'éthique du sport.",
    image_path: Rails.root.join("app/assets/images/atout-voix.jpg")
  },
  {
    name: "Atout",
    description: "L'association 'Atout voix' (ex 'Bel endroit pour une rencontre') propose une expérience originale et innovante : 'Raconte-moi un match' est un parcours original construit autour d’une série d’ateliers pédagogiques et ludiques avec 3 objectifs principaux : Education au langage, Ouverture sur les métiers dans les médias et sensibilisation à l'éthique du sport.",
    image_path: Rails.root.join("app/assets/images/atout-voix.jpg")
  }
]

created = 0
projects.each do |data|
  project = Project.create!(data.except(:image_path))

  if data[:image_path].present? && File.exist?(data[:image_path])
    File.open(data[:image_path]) do |file|
      project.image.attach(
        io: file,
        filename: "#{project.name.parameterize}#{File.extname(data[:image_path])}",
        content_type: "image/jpeg"
      )
    end
  end

  created += 1
end

puts "✅ #{User.count} utilisateurs créés"
puts "✅ #{created} projets créés"
