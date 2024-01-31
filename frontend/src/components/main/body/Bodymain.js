import ss from "../../../img/ss.png"
const Bodymain = () => {


    const myStyle = {
        aspectRatio: '1000/200',
        objectFit: 'cover'
      };

      const imgStyle = {
        aspectRatio: '200/200',
        objectFit: 'cover'
      };

    
    return (
        <div className="p-4">
            <section className="mb-6">
                <img
                    src={ss}
                    className="w-full h-64 object-cover mb-6"
                    width="1000"
                    height="500"
                    style={myStyle}
                />
                <h1 className="text-2xl font-bold mb-6">결산이 남이 결산하신 '플랜타시' 에 대한 추천강의</h1>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <img
                            src={ss}
                            className="w-full h-32 object-cover mb-4"
                            width="200"
                            height="200"
                            style={imgStyle}
                        />
                        <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">제목 (30자 이내)</h3>
                        <p className="text-sm text-muted-foreground">간단 설명 (50자 이내)</p>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-sm">카테고리: 카테고리</span>
                                <span className="text-sm">강의 기간: 2023-01-01 ~ 2023-06-01 (6개월)</span>
                                <span className="text-sm">강의 시간: 월, 목 08:00</span>
                            </div>
                            <div className="text-right">
                                <span className="text-lg font-bold line-through">₩360,000</span>
                                <span className="text-lg font-bold"> ₩360,000</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <img
                            src={ss}
                            className="w-full h-32 object-cover mb-4"
                            width="200"
                            height="200"
                            style={imgStyle}
                        />
                        <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">제목 (30자 이내)</h3>
                        <p className="text-sm text-muted-foreground">간단 설명 (50자 이내)</p>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-sm">카테고리: 카테고리</span>
                                <span className="text-sm">강의 기간: 2023-01-01 ~ 2023-06-01 (6개월)</span>
                                <span className="text-sm">강의 시간: 월, 목 08:00</span>
                            </div>
                            <div className="text-right">
                                <span className="text-lg font-bold line-through">₩360,000</span>
                                <span className="text-lg font-bold"> ₩360,000</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <img
                            src={ss}
                            className="w-full h-32 object-cover mb-4"
                            width="200"
                            height="200"
                            style={imgStyle}
                        />
                        <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">제목 (30자 이내)</h3>
                        <p className="text-sm text-muted-foreground">간단 설명 (50자 이내)</p>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-sm">카테고리: 카테고리</span>
                                <span className="text-sm">강의 기간: 2023-01-01 ~ 2023-06-01 (6개월)</span>
                                <span className="text-sm">강의 시간: 월, 목 08:00</span>
                            </div>
                            <div className="text-right">
                                <span className="text-lg font-bold line-through">₩360,000</span>
                                <span className="text-lg font-bold"> ₩360,000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mb-6">
                <h2 className="text-xl font-bold mb-4">최근 인기있는 강의들</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
                        <div className="flex flex-col space-y-1.5 p-6">
                            <img
                                src={ss}
                                className="w-full h-32 object-cover mb-4"
                                width="200"
                                height="200"
                                style={imgStyle}
                            />
                            <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">제목 (30자 이내)</h3>
                            <p className="text-sm text-muted-foreground">카테고리: 요가</p>
                        </div>
                        <div className="p-6">
                            <div className="text-right">
                                <span className="text-lg font-bold line-through">₩360,000</span>
                                <span className="text-lg font-bold"> ₩360,000</span>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
                        <div className="flex flex-col space-y-1.5 p-6">
                            <img
                                src={ss}
                                className="w-full h-32 object-cover mb-4"
                                width="200"
                                height="200"
                                style={imgStyle}
                            />
                            <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">제목 (30자 이내)</h3>
                            <p className="text-sm text-muted-foreground">카테고리: 요가</p>
                        </div>
                        <div className="p-6">
                            <div className="text-right">
                                <span className="text-lg font-bold line-through">₩360,000</span>
                                <span className="text-lg font-bold"> ₩360,000</span>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
                        <div className="flex flex-col space-y-1.5 p-6">
                            <img
                                src={ss}
                                className="w-full h-32 object-cover mb-4"
                                width="200"
                                height="200"
                                style={imgStyle}
                            />
                            <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">제목 (30자 이내)</h3>
                            <p className="text-sm text-muted-foreground">카테고리: 요가</p>
                        </div>
                        <div className="p-6">
                            <div className="text-right">
                                <span className="text-lg font-bold line-through">₩360,000</span>
                                <span className="text-lg font-bold"> ₩360,000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <h2 className="text-xl font-bold mb-4">카테고리별 클래스 모음</h2>
                <div className="flex flex-col sm:flex-row  hide-scrollbar mb-4" >
                    <div className="flex flex-col items-center mr-4">
                        <span className="relative flex shrink-0 overflow-hidden w-16 h-16 border rounded-full mb-2"></span>
                        <span className="text-lg">필사</span>
                    </div>
                    <div className="flex flex-col items-center mr-4">
                        <span className="relative flex shrink-0 overflow-hidden w-16 h-16 border rounded-full mb-2"></span>
                        <span className="text-lg">요가</span>
                    </div>
                    <div className="flex flex-col items-center mr-4">
                        <span className="relative flex shrink-0 overflow-hidden w-16 h-16 border rounded-full mb-2"></span>
                        <span className="text-lg">플랜타시</span>
                    </div>
                    <div className="flex flex-col items-center mr-4">
                        <span className="relative flex shrink-0 overflow-hidden w-16 h-16 border rounded-full mb-2"></span>
                        <span className="text-lg">자체개선</span>
                    </div>
                    <div className="flex flex-col items-center mr-4">
                        <span className="relative flex shrink-0 overflow-hidden w-16 h-16 border rounded-full mb-2"></span>
                        <span className="text-lg">스토리텔링</span>
                    </div>
                </div>
            </section>
        </div>
    )

}
export default Bodymain