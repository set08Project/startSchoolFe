import { Link, NavLink } from "react-router-dom";
import Button from "../../components/reUse/Button";

const LessonNote = () => {
  return (
    <div>
      <div className="min-h-[82vh] text-blue-950">
        <div>
          <h1 className="text-2xl pl-4 pt-2">Teacher's Lesson Note</h1>
          <div className="flex float-end">
            <NavLink to="/create-notes">
              <Button
                name="Add Note"
                className="py-4 px-4 bg-black text-white"
              />
            </NavLink>
          </div>
          <div className="py-9 w-full mt-24 p-3 border-b-2">
            <p className="font-bold">First Term Lesson Note</p>
            <div className="flex flex-wrap gap-10">
              {Array.from({ length: 10 }, () => (
                <NavLink to="">
                  <div className="card w-96 text-primary-content mt-3 *:first-letter:first-line: shadow-sm">
                    <div className="card-body text-black">
                      <h2 className="card-title">Lesson Note title!</h2>
                      <p>description: None</p>
                      <div className="card-actions justify-end"></div>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
          <div className="py-4 w-full mt-24 p-3 border-b-2">
            <p className="font-bold">Second Term Lesson Note</p>
            <div className="flex flex-wrap gap-10">
              {Array.from({ length: 3 }, () => (
                <NavLink to="">
                  <div className="card w-96 bg-primary text-primary-content mt-3 *:first-letter:first-line:">
                    <div className="card-body text-white">
                      <h2 className="card-title">Lesson Note title!</h2>
                      <p>description: None</p>
                      <div className="card-actions justify-end"></div>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
          <div className="py-4 w-full mt-24 p-3 border-b-2">
            <p className="font-bold">Third Term Lesson Note</p>
            <div className="flex flex-wrap gap-10">
              {Array.from({ length: 3 }, () => (
                <NavLink to="">
                  <div className="card w-96  text-primary-content mt-3 *:first-letter:first-line: shadow-sm">
                    <div className="card-body text-black">
                      <h2 className="card-title">Lesson Note title!</h2>
                      <p>description: None</p>
                      <div className="card-actions justify-end"></div>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonNote;
