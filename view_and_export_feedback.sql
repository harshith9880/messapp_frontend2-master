-- View all data in the feed1 table
SELECT * FROM feed1;

-- View data with specific filters (examples)
-- Filter by feedback type
SELECT * FROM feed1 WHERE feedbackType = 'Complaint';

-- Filter by date range (last 7 days)
SELECT * FROM feed1 WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY);

-- Filter by mess name
SELECT * FROM feed1 WHERE messName = 'Your Mess Name';

-- Count feedback by type
SELECT feedbackType, COUNT(*) as count 
FROM feed1 
GROUP BY feedbackType;

-- Count feedback by category
SELECT category, COUNT(*) as count 
FROM feed1 
GROUP BY category;

/*
To export data to Excel from MySQL Workbench:
1. Run any of the SELECT queries above
2. In the results pane, click the "Export" button (looks like a table with an arrow)
3. Choose "Excel (.xlsx)" as the export format
4. Select a location to save the file and click "Save"
*/
