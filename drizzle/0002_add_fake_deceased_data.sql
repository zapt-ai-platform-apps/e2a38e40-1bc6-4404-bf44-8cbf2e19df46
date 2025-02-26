-- Insert 1000 fake deceased records with death dates in the current month
WITH first_names AS (
  SELECT unnest(ARRAY[
    'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 
    'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 
    'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa', 
    'Matthew', 'Margaret', 'Anthony', 'Betty', 'Mark', 'Sandra', 'Donald', 'Ashley', 
    'Steven', 'Dorothy', 'Paul', 'Emily', 'Andrew', 'Michelle', 'Joshua', 'Amanda'
  ]) AS first_name
),
last_names AS (
  SELECT unnest(ARRAY[
    'Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 
    'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 
    'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez', 'Lewis', 'Lee', 
    'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King', 'Wright', 'Lopez', 
    'Hill', 'Scott', 'Green', 'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter'
  ]) AS last_name
),
descriptions AS (
  SELECT unnest(ARRAY[
    'Beloved parent who touched many lives',
    'Dedicated teacher who inspired generations',
    'Passionate artist who saw beauty everywhere',
    'Cherished friend with a generous spirit',
    'Devoted community leader who made a difference',
    'Loving grandparent who shared wisdom and kindness',
    'Respected professional known for integrity',
    'Adventurous soul who lived life to the fullest',
    'Caring mentor who helped others succeed',
    'Faithful partner whose love endures',
    'Visionary entrepreneur who created opportunities',
    'Compassionate healthcare worker who healed many',
    'Talented musician who brought joy through sound',
    'Dedicated public servant who worked for the greater good',
    'Generous philanthropist who supported important causes',
    'Courageous individual who faced challenges with grace',
    'Brilliant mind who contributed to scientific advancement',
    'Devoted animal lover who protected the vulnerable',
    'Cherished sibling whose bond was unbreakable',
    'Inspirational figure who motivated others to improve'
  ]) AS description
)

INSERT INTO "deceased" ("name", "date_of_death", "description")
SELECT 
  first_name || ' ' || last_name AS name,
  (DATE_TRUNC('month', CURRENT_DATE) + 
   (FLOOR(random() * EXTRACT(DAY FROM (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month' - INTERVAL '1 day'))))::INTEGER * INTERVAL '1 day')::TIMESTAMP AS date_of_death,
  description
FROM 
  first_names,
  last_names,
  descriptions,
  generate_series(1, 13) AS i
LIMIT 1000;