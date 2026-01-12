Core Implementation Analysis
1. Data Ingestion Layer (
useProductIngestion
)
Objective: Decouple data fetching logic from the UI. Implementation:

Custom Hook: We created 
useProductIngestion
 to encapsulate the fetch logic.
Asynchronous Handling: Used useEffect to trigger the fetch on mount ([] dependency array) handling loading and error states manually.
Transformation Pattern: The critical requirement was "sanitizing" data. Instead of raw numbers, we mapped over the API response and added a formattedPrice property using Intl.NumberFormat.
Benifit: The UI components become "dumb" views—they simply display formattedPrice without knowing how it was calculated.
2. Global State Management (InventoryContext)
Objective: Persist stock changes across page navigation (the "Live memory" requirement). Implementation:

Context API: We used React Context because the state (inventory drafts) needed to be accessible by multiple widely-separated components (Dashboard, ProductCard, ProductDetail) and survive route changes.
Draft Pattern: We did not mutate the original fetching logic. Instead, we created a drafts object { [id]: newStock }.
Logic:
If 
id
 exists in drafts, the UI shows the draft value.
If not, it falls back to the static API value.
Benifit: This is efficient (O(1) lookup) and cleaner than managing a complex merge strategy.
3. Dynamic Routing & Filtering
Objective: URL as the single source of truth. Implementation:

Client-Side Filtering: In 
CategoryView
, we used useParams() to get the category slug.
Optimization: We used useMemo to filter the global products list.
const filtered = useMemo(() => products.filter(...), [products, slug]);
This ensures we don't expensive array operations on every render unless the data or URL changes.
Technical & HR Interview Questions
Q1: Why did you choose Context API over a library like Redux or Zustand?
Answer: "For this specific application, the state requirements were focused solely on the 'draft' inventory updates. Since the scope was limited to this specific feature and didn't involve complex deeply-nested state updates or high-frequency changes that might cause performance bottlenecks, React's built-in Context API was the most efficient choice. It avoided the boilerplate of Redux while perfectly solving the requirement of persisting state across route boundaries."

Q2: How did you handle the requirement to keep the view "dumb"?
Answer: "I implemented a transformation layer inside the custom hook. When the data arrives from the API, I immediately map over it to create view-specific properties like formattedPrice. This means the Component doesn't need to import formatting libraries or run logic; it just renders a string. This improves performance (calculation happens once) and maintainability."

Q3: Explain how you ensured navigation stability in the Sidebar.
Answer: "I utilized React Router's NavLink component. It automatically detects if the current URL matches the link's 
to
 prop and provides an isActive boolean. I used this to conditionally apply the active CSS class. This ensures the sidebar state is always in sync with the URL, treating the URL as the single source of truth rather than using local state."

Q4: You used useMemo in the category view. Why?
Answer: "Filtering an array can be expensive if the dataset grows. If the component re-renders (e.g., due to a parent update or unrelated state change), we don't want to re-run the .filter() method. useMemo caches the result and only recalculates if the products array or the category URL parameter changes, ensuring the application remains high-performance."