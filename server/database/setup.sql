DROP TABLE IF EXISTS diary;

CREATE TABLE diary (
    diary_id INT GENERATED ALWAYS AS IDENTITY,
    diary_category VARCHAR(30) NOT NULL,
    diary_text VARCHAR(500) NOT NULL,
    diary_date VARCHAR(30) NOT NULL,
    diary_time INT NOT NULL
);

INSERT INTO diary
    (diary_category, diary_text, diary_date, diary_time)
VALUES
    ('Day', 'Does this work?', 'monday', 3);