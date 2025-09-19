
INSERT INTO bird_order (id, name) VALUES 
(gen_random_uuid(), 'Columbiformes'),
(gen_random_uuid(), 'Passeriformes'),
(gen_random_uuid(), 'Strigiformes');

INSERT INTO bird_family (id, name, "order_id") values
(gen_random_uuid(), 'Columbidae', (SELECT id FROM bird_order WHERE name = 'Columbiformes')),
(gen_random_uuid(), 'Dicaeidae', (SELECT id FROM bird_order WHERE name = 'Passeriformes')),
(gen_random_uuid(), 'Zosteropidae', (SELECT id FROM bird_order WHERE name = 'Passeriformes')),
(gen_random_uuid(), 'Timaliidae', (SELECT id FROM bird_order WHERE name = 'Passeriformes')),
(gen_random_uuid(), 'Strigidae', (SELECT id FROM bird_order WHERE name = 'Strigiformes'));

INSERT INTO bird_species (id, name, "family_id") values
(gen_random_uuid(), 'Dicaeum agile', (SELECT id FROM bird_family WHERE name = 'Dicaeidae')),
(gen_random_uuid(), 'Dicaeum chrysorrheum', (SELECT id FROM bird_family WHERE name = 'Dicaeidae')),
(gen_random_uuid(), 'Dicaeum melanoxanthum', (SELECT id FROM bird_family WHERE name = 'Dicaeidae')),
(gen_random_uuid(), 'Dicaeum concolor', (SELECT id FROM bird_family WHERE name = 'Dicaeidae')),
(gen_random_uuid(), 'Dicaeum ignipectus', (SELECT id FROM bird_family WHERE name = 'Dicaeidae')),
(gen_random_uuid(), 'Zosterops erythropleurus', (SELECT id FROM bird_family WHERE name = 'Zosteropidae')),
(gen_random_uuid(), 'Zosterops palpebrosus', (SELECT id FROM bird_family WHERE name = 'Zosteropidae')),
(gen_random_uuid(), 'Zosterops japonicus', (SELECT id FROM bird_family WHERE name = 'Zosteropidae')),
(gen_random_uuid(), 'Garrulax perspicillatus', (SELECT id FROM bird_family WHERE name = 'Timaliidae')),
(gen_random_uuid(), 'Garrulax albogularis', (SELECT id FROM bird_family WHERE name = 'Timaliidae')),
(gen_random_uuid(), 'Garrulax leucolophus', (SELECT id FROM bird_family WHERE name = 'Timaliidae')),
-- Columbidae Species ok
(gen_random_uuid(), 'Columba punicea', (SELECT id FROM bird_family WHERE name = 'Columbidae')),
(gen_random_uuid(), 'Streptopelia orientalis', (SELECT id FROM bird_family WHERE name = 'Columbidae')),
(gen_random_uuid(), 'Streptopelia tranquebarica', (SELECT id FROM bird_family WHERE name = 'Columbidae')),
(gen_random_uuid(), 'Streptopelia chinensis', (SELECT id FROM bird_family WHERE name = 'Columbidae')),
(gen_random_uuid(), 'Macropygia unchall', (SELECT id FROM bird_family WHERE name = 'Columbidae')),


-- Strigidae Species ok
(gen_random_uuid(), 'Otus spilocephalus', (SELECT id FROM bird_family WHERE name = 'Strigidae')),
(gen_random_uuid(), 'Otus lempiji', (SELECT id FROM bird_family WHERE name = 'Strigidae')),
(gen_random_uuid(), 'Otus lettia', (SELECT id FROM bird_family WHERE name = 'Strigidae')),
(gen_random_uuid(), 'Bubo nipalensis', (SELECT id FROM bird_family WHERE name = 'Strigidae')),
(gen_random_uuid(), 'Otus sunia', (SELECT id FROM bird_family WHERE name = 'Strigidae'));
