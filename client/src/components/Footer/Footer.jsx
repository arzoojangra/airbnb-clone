export default function Footer() {
  return (
    <div className="px-10 py-10 bg-gray-200 justify-between gap-8 text-center mt-20">
      <div className="border-b border-gray-500 grid grid-cols-3 pb-6">
        <div className="gap-2 px-5">
          <b className="text-2xl my-2">Support</b>
          <p className="py-2 cursor-pointer mt-3">Help Center</p>
          <p className="py-2 cursor-pointer">Air Cover</p>
          <p className="py-2 cursor-pointer">Supporting people</p>
          <p className="py-2 cursor-pointer">Cancellation Options</p>
          <p className="py-2 cursor-pointer">Report a concern</p>
        </div>
        <div className="gap-2 px-5">
          <b className="text-2xl my-2">Community</b>
          <p className="py-2 cursor-pointer mt-3">Disaster relief fund</p>
          <p className="py-2 cursor-pointer">Combating Discrimination</p>
          <p className="py-2 cursor-pointer">Careers</p>
          <p className="py-2 cursor-pointer">NewsRoom</p>
          <p className="py-2 cursor-pointer">Investors</p>
        </div>
        <div className="gap-2 px-5">
          <b className="text-2xl my-2">Hosting</b>
          <p className="py-2 cursor-pointer mt-3">Explore hosting resources</p>
          <p className="py-2 cursor-pointer">Air Cover for Hosts</p>
          <p className="py-2 cursor-pointer">How to Host responsibly</p>
        </div>
      </div>
    </div>
  );
}
