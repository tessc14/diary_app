DROP TABLE IF EXISTS diary;

CREATE TABLE diary (
    diary_id INT GENERATED ALWAYS AS IDENTITY,
    diary_category VARCHAR(30) NOT NULL,
    diary_text VARCHAR(500) NOT NULL,
    diary_date DATE
);

INSERT INTO diary
    (diary_category, diary_text, diary_date)
VALUES
    ('Day', 'Does this work?', '2023-02-9');
