CREATE TABLE IF NOT EXISTS "deceased" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "date_of_death" TIMESTAMP NOT NULL,
  "description" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW()
);

-- Insert some initial data
INSERT INTO "deceased" ("name", "date_of_death", "description")
VALUES 
  ('John Doe', '2020-01-15', 'Beloved father and husband'),
  ('Jane Smith', '2021-03-22', 'Caring mother and friend'),
  ('Robert Johnson', '2019-11-05', 'Respected teacher and mentor'),
  ('Emily Williams', '2022-07-19', 'Talented artist and musician'),
  ('Michael Brown', '2020-09-30', 'Dedicated doctor who saved many lives');